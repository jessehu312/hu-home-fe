import './Button.css';

const Button = (props) => {
  const { onClick, children, primary, secondary } = props;
  let className = '';
  if (primary) {
    className = 'primary';
  } else if (secondary) {
    className = 'secondary';
  }
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button;