import React from 'react'
import styles from "./Section4.module.css"
// import Tilt from 'react-tilt'

function Section4() {
  return (
    <div className={styles.Section}>
      <div className={styles.Header}>
        <div className={styles.Heading}>Connect with the community!</div>
        <div className={styles.Content}>
          Join a vibrant community of creators and collectors who share your
          passion for digital ownership.
        </div>
      </div>
      <div className={styles.Cards}>
        <div className={styles.Card1}>
          <img
            src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/A_very_distant_view_of_one_single_white_glowing_ma_boydbj.jpg"
            alt="Pyramids"
          />
          <div className={styles.CardText}>
            <div className={styles.CardHeading}>Pyramids</div>
            <div className={styles.CardSub}>Places</div>
            <div className={styles.CardOwner}>@Max_million</div>
          </div>
        </div>
        <div className={styles.Card1}>
          <img
            src="https://image.lexica.art/full_jpg/5d6b4cca-7145-4a31-b844-144f6442d342"
            alt="Red Fort"
          />
          <div className={styles.CardText}>
            <div className={styles.CardHeading}>Red Fort</div>
            <div className={styles.CardSub}>History</div>
            <div className={styles.CardOwner}>@Shikamaru_Saga</div>
          </div>
        </div>
        <div className={styles.Card1}>
          <img
            src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/A_cute_adorable_baby_engineer_robot_made_of_crysta_zcel22.jpg"
            alt="Robot"
          />
          <div className={styles.CardText}>
            <div className={styles.CardHeading}>Sci-fi Tech</div>
            <div className={styles.CardSub}>Technology</div>
            <div className={styles.CardOwner}>@Sanskar</div>
          </div>
        </div>
        <div className={styles.Card1}>
          <img
            src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/Cute_and_adorable_cartoon_goku_baby_gadofu.jpg"
            alt="Goku"
          />
          <div className={styles.CardText}>
            <div className={styles.CardHeading}>Goku Super Sayan</div>
            <div className={styles.CardSub}>Anime</div>
            <div className={styles.CardOwner}>@Hiwatari_Kai</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section4