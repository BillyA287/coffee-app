import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";

import cls from 'classnames'

import coffeeStoresData from "../../data/coffee-stores.json";
import { fetchCoffeStores } from "../../lib/coffee-stores";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeStores();

  

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

  const handleUpvoteButton = (e)=> {
      console.log("handle upvote")
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
        <h1 className={styles.name}>{name}</h1>
        </div>
      <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name}></Image>
        
      </div>
      <div className={cls("glass",styles.col2)}>
        <div className={styles.iconWrapper}> 
          <Image src="/icons/nearMe.svg" width={"24"} height={"24"}/>
            <p className={styles.text}>{address}</p>
        </div>
        <div className={styles.iconWrapper}> 
          <Image src="/icons/places.svg" width={"24"} height={"24"}/>
            <p className={styles.text}>{neighbourhood}</p>
        </div>
        
        <div className={styles.iconWrapper}> 
          <Image src="/icons/star.svg" width={"24"} height={"24"}/>
            <p className={styles.text}>{1}</p>
        </div>
        <button className={styles.upvoteButton} onClick={handleUpvoteButton}> up vote! </button>
      </div>
    </div> 
    </div>
  );
};

export default CoffeeStore;
