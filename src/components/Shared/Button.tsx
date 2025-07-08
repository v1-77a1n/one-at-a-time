import '@/styles/button.css'

type ButtonProps = {
      type: 'home' | 'task',
      text: string,
      id?: string,
      color?: string,
      onClick?: () => void,
      submit?: boolean
}

function Button({ type, color, text, id, onClick, submit }: ButtonProps) {
      const btnType = submit ? 'submit' : 'button'
      color = color ? color : ''

      return (
            <button {...id ? { id: id } : {}} type={btnType} className={`${type} ${color}`} {...onClick ? { onClick: onClick} : {} }>
                  <p className='button-text'>{text}</p>
            </button>
      )
}

export default Button