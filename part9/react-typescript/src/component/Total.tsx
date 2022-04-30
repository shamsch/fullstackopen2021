interface IProps{
    content: content[];
}

type content = {
    name: string;
    exerciseCount: number;
}

export const Total = ({content}:IProps) => {
  return (
    <p>
        Number of exercises{" "}
        {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}
