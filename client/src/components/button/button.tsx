import { h, Component } from 'preact';
import { style } from 'decorators/style';

import styles from './button.scss';

interface IButtonProps {
  text: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: (e) => void;
  onMouseUp?: (e) => void;
  onMouseDown?: (e) => void;
};

@style(styles)
export class Button extends Component<IButtonProps, {}> {
  render () {
    const { text, className, onClick, onMouseDown, onMouseUp, isDisabled } = this.props;
    const isDisabledClass = isDisabled ? 'isDisabled' : '';
    const onClickCallback = isDisabled ? undefined : onClick;
    
    return (
      <div
        className={`button ${className} ${isDisabledClass}`}
        onClick={onClickCallback}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}>
        <span className='text'>{text}</span>
      </div>
    );
  }
};