

export const metadata = {
  title: 'Job Finder',
  description: 'Find your dream job!',
};

export default function Home() {
  return (
    <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 450px)' }}>
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Best Position Ever Found</h1>
      <p className="text-lg w-[420px] text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  </div>
  );
}
