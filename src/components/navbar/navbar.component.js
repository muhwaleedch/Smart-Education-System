import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {LOGOUT_USER} from "../../redux/actions/user";

const NavbarComponent = () => {
  const router = useRouter();
  const userPayload = useSelector(state => state.userInfo);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userPayload?.userPayload) {
      router.push("/sign-in");
    }
  }, [userPayload?.userPayload]);

  return (
    <>
      <div className="d-flex px-lg-5 pt-5 justify-content-end position-absolute" style={{top: "50px", right: "50px", zIndex: 100}}>
        {userPayload?.userPayload ? (<button style={{cursor: "pointer"}} onClick={() => {
          console.log('button clicked')
          dispatch({
            type: LOGOUT_USER
          })
        }} className="e-btn">Logout</button>) : <button style={{cursor: "pointer"}} className="e-btn" onClick={() => {
          router.push("/sign-in");
        }}>Login</button>}
      </div>
    </>
  );
}

export default NavbarComponent;
