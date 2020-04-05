import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './form.module.scss';

interface FormProps {
  readonly action: string;
  readonly onSubmit: (event: Event) => void;
}

/**
 *
 */
export const Form: FC<FormProps> = (props): JSX.Element => (
  <form
    className={styles.form}
    method="post"
    action={props.action}
    onSubmit={props.onSubmit}
  >
    {props.children}
  </form>
);
