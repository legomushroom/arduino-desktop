import { h, Component } from 'preact';
import { style } from 'decorators/style';

import styles from './icon.scss';

interface IButtonProps {
  shape: string;
  className?: string;
};

@style(styles)
export class Icon extends Component<IButtonProps, {}> {
  render () {
    const { shape, className } = this.props;

    const markup = `
      <svg viewBox="0 0 30 30">
        <use xlink:href="#${shape}-shape" />
      </svg>
    `;
    
    return (
      <div className={`icon ${className}`} dangerouslySetInnerHTML={{ __html: markup }} />
    );
  }
};