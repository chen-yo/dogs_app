/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  gallery: css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
  `,
  item: css`
    background-size: cover;
    min-height: 220px;
    position: relative;

    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
  `,
  chip: css`
    background-color: #e0e0e0;
    border-radius: 16px;
    padding: 8px 15px;
    margin: 2px;
    font-size: 0.8rem;
    height: 20px;
    justify-content: center;
    align-items: center;
    width: 30%;
  `,
  breed: css`
    position: absolute;
    bottom: 2px;
    margin-left: 2px;
    margin-bottom: 2px;
    background-color: #e0e0e0;
    width: fit-content;
    padding: 2px;
    font-size: 0.8rem;
  `,
};

export default function Gallery({ dogs, onLike }) {

  return (
    <div css={styles.gallery}>
      {dogs.map(({ imageUrl, breed, likes }) => (
        <div
          onClick={() => onLike(imageUrl)}
          css={[
            css`
              background: url("${imageUrl}") no-repeat;
            `,
            ,
            styles.item,
          ]}
          key={imageUrl}
        >
          {likes > 0 && (
            <div css={styles.chip}>
              <span>{likes} Likes</span>
            </div>
          )}

          <div css={styles.breed}>{breed}</div>
        </div>
      ))}
    </div>
  );
}
