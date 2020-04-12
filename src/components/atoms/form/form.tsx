import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './form.module.scss';

interface FormProps {
  readonly action: string;
  readonly className: string;
}

/**
 *
 */
export const Form: FC<FormProps> = (props): JSX.Element => (
  <form
    className={[styles.form, props.className].join(' ')}
    method="post"
    action={props.action}
  >
    {props.children}
  </form>
);
