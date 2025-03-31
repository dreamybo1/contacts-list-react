import { useStore } from '@/shared/store'
import styles from './style.module.scss'

function Error() {
    const {error, errorValue} = useStore()
  return (
    <div className={`${styles.error} ${error && styles.error_opened}`}>
        {errorValue}
    </div>
  )
}

export default Error