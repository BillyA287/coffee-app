import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";

import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const params = staticProps.params;

  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export const CoffeeStore = (props) => {
  const router = useRouter();
  console.log(router);

  console.log(props);
  if (router.isFallback) {
    return "Loading";
  }

  const { name, address, neighbourhood, imgUrl } = props.coffeeStore;
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.backToHomeLink}>
        <Link href="/">
          <a>Back to home</a>
        </Link> 
        </div>
        <div className={styles.nameWrapper}>
        <h1 className={styles.name}>{styles.name}</h1>
        </div>
      <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name}></Image>
        
      </div>
      <div className={styles.col2}>
        <p>{address}</p>
        <p>{neighbourhood}</p>
      </div>
    </div> 
    </div>
  );
};

export default CoffeeStore;
