import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from 'jwt-decode';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log("response", response)
    const profileObj = jwt_decode(response.credential);
    console.log(profileObj)
    console.log("profileObj", profileObj)
    localStorage.setItem('user', JSON.stringify(profileObj));
    const { name, picture, sub } = profileObj;
    console.log(response.clientId)
    const doc = {
      _id: sub,
      _type: 'user',
      UserName: name,
      Image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', {replace: true});
    });
  };

  return (
    <GoogleOAuthProvider clientId="1038357166805-luanbn45nl7q9oqa4hhlm0aefcp70s5h.apps.googleusercontent.com">

      <div className="flex justify-start items-center flex-col h-screen">
        <div className=" relative w-full h-full">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />

          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width="130px" />
            </div>

            <div className="shadow-2xl">
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
                scope='profile'
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>

  );
};

export default Login;
