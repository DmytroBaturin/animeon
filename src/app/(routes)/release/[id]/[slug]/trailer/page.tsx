export const runtime = 'edge'

export default function Page() {
  return (
    <div className="w-full justify-center h-full max-h-[480px] items-center h-full flex">
      <iframe
        className="w-full min-h-[360px] h-full"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      />
    </div>
  )
}
