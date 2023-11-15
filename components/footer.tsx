const Footer = () => {
  return (
    <footer
      className="border-t-2 border-gray-100 py-5"
    >
      <div
        className="container flex justify-between flex-col h-full"
      >
        <div>
          <h1
            className="text-4xl font-bold"
          >
            Dribble
          </h1>
          <p
            className="max-w-sm text-sm text-gray-500"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aliquid enim illo omnis, aspernatur culpa eum
          </p>
        </div>
        <div
          className="text-sm text-gray-500 text-center"
        >
          Copy right 2023
        </div>
      </div>
    </footer>
  )
}

export default Footer