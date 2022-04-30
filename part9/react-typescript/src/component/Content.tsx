interface IProps{
    content: content[];
}

type content = {
    name: string;
    exerciseCount: number;
}

export const Content = ({content}: IProps) => {
  return (
    <div>
        {content.map((ele)=>{
            return <p>{ele.name} {ele.exerciseCount}</p>
        })}
    </div>
  )
}
