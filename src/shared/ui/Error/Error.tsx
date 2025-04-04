import styles from './style.module.scss'
import { useAppSelector } from '@/shared/hooks/hooks'

function Error() {
  const { error, errorValue } = useAppSelector(state => state.errors)

  return (
    <div className={`${styles.error} ${error && styles.error_opened}`}>
        {errorValue}
    </div>
  )
}

export default Error