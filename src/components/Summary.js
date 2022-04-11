/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function summary(dogs) {
  const map = {};

  for (let i = 0; i < dogs.length; i++) {
    const dog = dogs[i];

    if (map[dog.breed]) {
      map[dog.breed].count++;
      map[dog.breed].likes = map[dog.breed].likes + dog.likes;
    } else {
      map[dog.breed] = { count: 1, likes: dog.likes };
    }

    console.log(map);
  }

  return map;
}

export default function Summary({dogs}) {
  const stats = summary(dogs);

  return (
    <div
      css={css`
        padding-left: 2px;
      `}
    >
      {Object.keys(stats).map((breed) => {
        const { count, likes } = stats[breed];

        return (
          <div
            css={css`
              margin-bottom: 15px;
            `}
          >
            <div>{breed}</div>
            <div
              css={css`
                display: flex;
                color: #9d9d9d;
              `}
            >
              <span
                css={css`
                  margin-right: 4px;
                `}
              >
                count: {count}{" "}
              </span>
              <span>likes: {likes} </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
