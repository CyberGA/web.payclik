export default function PrimaryBtn({ children, text, bg = "bg-secondary", sx = "", ...props }) {
  return (
    <div
      className={`flex flex-row items-center justify-center gap-x-2 ${bg} h-[60px] w-full rounded-lg text-white cursor-pointer ${sx}`}
      {...props}
    >
      <p className="font-bold text-lg font-inter">{text}</p>
      {children}
    </div>
  );
}
