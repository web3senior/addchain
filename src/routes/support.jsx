import { Title } from './helper/DocumentTitle'
import styles from '../styles/module/Support.module.scss'

export default function Support() {
    Title('Donate')
    return (
        <>
            <h2>Donate</h2>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <p>
                        If you find this website is helpful, it would be greatly appreciated if you could tip Ether to the address below. Thank you! 💛
                        <br />
                        <figure>
                            <img alt='Donate Address QRCode' src={require('./../images/donate_address.jpg')} />
                        </figure>
                        <br />
                        My Public Address to Receive ETH <code>0xA4414754072c53e7774511cd5239747c7302ED05</code>
                        <br />
                        Pay me via <a href='https://link.trustwallet.com/send?coin=60&address=0xA4414754072c53e7774511cd5239747c7302ED05' target='_black'>Trust Wallet</a>
                    </p>

                </div>
            </div>
        </>
    );
}