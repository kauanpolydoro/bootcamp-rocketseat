import styles from './styles.module.scss';

type SubscribeButtonProps = {
  priceId: string;
}

export function SubsribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}