import Icon from '../../assets/logo.png';


export const LoginHeader = () => {
  return (
  <header class="bg-opacity-0">
      <div className='w-48'>
        <img src={Icon} class="object-fill text-white p-2 rounded-full" />
      </div>
  </header>
  );
}