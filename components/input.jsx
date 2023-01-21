

export default function CInput({sx, ...props}) {
    return (
      <input
        className={`h-[60px] w-full bg-white/5 outline-none border border-white/90 p-2 text-white rounded-lg ${sx}`} {...props}
      />
    );
}