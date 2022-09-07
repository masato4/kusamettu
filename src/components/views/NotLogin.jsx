import { Button } from '@mantine/core';
import { LoginHeader } from '../parts/LoginHeader';

export const NotLogin = ({login}) => {
  return (
    <>
      <div className='image max-w-screen max-h-screen text-center' >
        {/* <img src={BgImg} className="object-fill w-full absolute -z-10 top-0" alt="" /> */}
        <LoginHeader />
        <div className='sm:text-9xl text-6xl w-fit text-white grid grid-cols-1 place-content-center '><div>みんな草<br />はやしてる？</div></div>
        <Button sx={{
        backgroundColor: 'green',
        height: '80px',
        width: '170px',
        // レスポンス対応
        '@media (max-width: 768px)': {
          marginTop: '400px',
        },
        '&:hover': {
          backgroundColor: '#fff',
          color: 'green',
        }
      }} className="text" onClick={login}>
          草をはやしにいく
        </Button>
      </div>
    </>
  );
}