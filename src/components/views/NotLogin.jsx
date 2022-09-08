import { Button } from "@mantine/core";
import { LoginHeader } from "../parts/LoginHeader";

export const NotLogin = ({ login }) => {
  return (
    <>
      <div className="image max-w-screen max-h-screen text-center">
        {/* <img src={BgImg} className="object-fill w-full absolute -z-10 top-0" alt="" /> */}
        <LoginHeader />
        <div className="sm:text-9xl text-6xl text-white w-screen grid grid-cols-1 my-24 place-content-center ">
          <div className="text-center break-normal">
            みんな草、
            <br />
            はやしてる？
          </div>
        </div>
        <Button onClick={login} color="green" size="xl" style={{ width: 400 }}>
          <div className="">草を生やしに行く</div>
        </Button>
      </div>
    </>
  );
};

export default NotLogin;
