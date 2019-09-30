<?php

namespace app\controllers;

use Yii;
use sizeg\jwt\Jwt;
use yii\rest\Controller;
use sizeg\jwt\JwtHttpBearerAuth;
use yii\helpers\VarDumper;

class AuthController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => JwtHttpBearerAuth::class,
            'optional' => [
                'login'
            ],
        ];

        return $behaviors;
    }

    protected function verbs()
    {
        return [
            'login' => ['POST'],
        ];
    }

    /**
     * @return \yii\rest\Response
     */
    public function actionLogin()
    {
        /** @var Jwt $jwt */
        $jwt = Yii::$app->jwt;
        $signer = $jwt->getSigner('HS256');
        $key = $jwt->getKey();
        $time = time();

        // Adoption for lcobucci/jwt ^4.0 version
        $token = $jwt->getBuilder()
            ->identifiedBy('4f1g23a12aa', true)// Configures the id (jti claim), replicating as a header item
            ->issuedAt($time)// Configures the time that the token was issue (iat claim)
            ->expiresAt($time + 3600)// Configures the expiration time of the token (exp claim)
            ->withClaim('uid', 100)// Configures a new claim, called "uid"
            ->getToken($signer, $key); // Retrieves the generated token
        
        $request = Yii::$app->request->getRawBody();
        $data= json_decode($request);
        // Tangkap data login dari client (username & password)
        $username = $data->{'username'};
        $password = $data->{'password'};
        $response = [];
        // validasi jika kosong
        if(empty($username) || empty($password)){
            $response = [
                'status' => 'error',
                'message' => 'username & password tidak boleh kosong!',
                'user' => '',
            ];
        }else{
            // cari di database, ada nggak username dimaksud
            $user = \app\models\Users::findByUsername($username);
            // jika username ada maka
            if(!empty($user)){
                
              // check, valid nggak passwordnya, jika valid maka bikin response success
              if($user->validatePassword($password)){
                $response = [
                  'status' => 'success',
                  'message' => 'login berhasil!',
                  'user' => [
                      'id' => $user->id,
                      'username' => $user->username,
                      // token diambil dari field auth_key
                      'token' => (string)$token,
                  ]
                ];
              }
              // Jika password salah maka bikin response seperti ini
              else{
                $response = [
                  'status' => 'error',
                  'message' => 'password salah!',
                  'user' => '',
                ];
              }
            }
            // Jika username tidak ditemukan bikin response kek gini
            else{
              $response = [
                'status' => 'error',
                'message' => 'username tidak ditemukan dalam database!',
                'user' => '',
              ];
            }
        }
     
        return $this->asJson($response);
    }
}