export function Content ({ contentSrc }: {contentSrc: string}) {
  return (
    <div className='h-96 w-full bg-black'>
      <img className='object-cover w-full h-full' src={contentSrc} />
    </div>)
}
