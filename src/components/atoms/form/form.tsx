import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './form.module.scss';

interface FormProps {
  readonly action: string;
}

/**
 *
 * @param event
 */
function onSubmit(event: Event): void {
  event.preventDefault();
}

/**
 *
 */
export const Form: FC<FormProps> = (props): JSX.Element => (
  <form
    className={styles.form}
    method="post"
    action={props.action}
    onSubmit={onSubmit}
  >
    {props.children}
    <noscript>
      <div className={styles.buttons}>
        <button type="submit" aria-label="Update">
          Update
        </button>
      </div>
    </noscript>
  </form>
);
