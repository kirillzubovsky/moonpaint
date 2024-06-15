export default function Container({className,children, ...props }) {
  return (
    <div className={`container mx-auto w-full lg:max-w-screen-xl content-between flex flex-wrap gap-6 mt-6 ${(className !== undefined ? className : '')}`} {...props}>
      {children}
    </div>
  );
}
