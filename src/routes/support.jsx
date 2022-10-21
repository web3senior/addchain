import styles from '../styles/modules/Support.module.scss'
export default function Support() {
    return (
        <>
            <h1>Donate</h1>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <p>
                        If you find this website is helpful, it would be greatly appreciated if you could tip Ether to the address below. Thank you! 💛
                    </p>
                    <code>
                        0xA37403fc65E81F61213f6925B7eFd4338d2DB355
                    </code>
                </div>
            </div>
        </>
    );
}