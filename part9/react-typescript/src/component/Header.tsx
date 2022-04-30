interface IProps{
    name: string
}

const Header = ({name}:IProps) => {
  return (
    <>
        <h1>{name}</h1>
    </>
  )
}

export default Header