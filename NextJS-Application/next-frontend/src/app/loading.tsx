import { FadeLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <FadeLoader color="#4A90E2" loading={true} height={15} width={5} radius={2} margin={2} />
    </div>
  );
};

export default Loading;
