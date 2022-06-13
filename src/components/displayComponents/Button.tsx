export const Button=(action:()=>any,text:string)=>{
    return (<button
        type="button"
        onMouseUp={() => {
            action()
        }}
      >
        {text}
      </button>)
}