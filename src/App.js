/** @jsxImportSource @emotion/react */

import './App.css';
import { css } from '@emotion/react';
import FileSaver from 'file-saver';
import { useState } from 'react';

const pageStyles = css`
  background: url(https://cdn-media-1.freecodecamp.org/imgr/MJAkxbh.png);
  height: 100vw;
`;
const headerStyles = css`
  font-weight: bold;
  font-size: 40px;
  padding: 50px;
`;
const imageStyles = css`
  height: 200px;
  width: 200px;
  display: flex;
  border: solid black 1px;
  /* justify-content: space-around; */
  /* margin: 0 auto; */
`;
const memeGeneratorStyles = css`
  display: flex;
  padding: 30px;
  justify-content: center;
`;
const allLabelStyles = css`
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
  /* align-items: flex-start; */
`;

const labelStyles = css`
  display: block;
  margin: 0 auto;
  width: 200px;
  padding: 10px;
`;

const buttonStyles = css`
  display: flex;
  /* width: 300px; */
  border-radius: 8px;
  font-size: 15px;
  justify-content: center;
  gap: 20px;
  padding: 3px 10px 3px 10px;
`;

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeTemplate, setMemeTemplate] = useState('');
  const downloadUrl = `https://api.memegen.link/images/${
    memeTemplate ? memeTemplate : 'bender'
  }/${topText ? topText : '_'}/${bottomText ? bottomText : '_'}.png`;
  // const [generatedMeme, setGeneratedMeme] = useState(
  //   `https://api.memegen.link/images/bender.png`,
  // );
  const [imageUrl, setImageUrl] = useState(
    `https://api.memegen.link/images/bender.png`,
  );
  const saveFile = () => {
    FileSaver.saveAs(downloadUrl, 'meme.png');
  };
  const generateMeme = () => {
    if (topText || bottomText || memeTemplate) {
      setImageUrl(downloadUrl);
    } else {
      setImageUrl(`https://api.memegen.link/images/${memeTemplate}`);
    }
  };

  return (
    <div className="App" css={pageStyles}>
      <div css={headerStyles}>React Meme Generator</div>
      <div css={memeGeneratorStyles}>
        <div css={allLabelStyles}>
          <div>
            <label css={labelStyles}>
              Meme template
              <input
                value={memeTemplate}
                onChange={(event) => {
                  // uncomment if you want it to react without the generate button
                  // setImageUrl(
                  //   `https://api.memegen.link/images/${event.currentTarget.value}/${topText}/${bottomText}.png`,
                  // );
                  setMemeTemplate(event.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    generateMeme(e.target.value);
                  }
                }}
              />
            </label>
          </div>
          <div>
            <label css={labelStyles}>
              Top text
              <input
                value={topText}
                onChange={(event) => {
                  // uncomment if you want it to react without the generate button
                  setImageUrl(
                    `https://api.memegen.link/images/${
                      memeTemplate || 'bender'
                    }/${event.currentTarget.value || ' '}/${bottomText}.png`,
                  );
                  setTopText(event.currentTarget.value);
                }}
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter') {
                //     e.preventDefault();
                //     generateMeme(e.target.value);
                //   }
                // }}
              />
            </label>
          </div>

          <div>
            <label css={labelStyles}>
              Bottom text
              <input
                value={bottomText}
                onChange={(event) => {
                  // uncomment if you want it to react without the generate button
                  setImageUrl(
                    `https://api.memegen.link/images/${
                      memeTemplate || 'bender'
                    }/${topText}/${event.currentTarget.value || ' '}.png`,
                  );
                  setBottomText(event.currentTarget.value);
                }}
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter') {
                //     e.preventDefault();
                //     generateMeme(e.target.value);
                //   }
                // }}
              />
            </label>
          </div>
        </div>
        <div css={imageStyles}>
          <img data-test-id="meme-image" src={imageUrl} alt="generated meme" />
        </div>
      </div>
      <div css={buttonStyles}>
        <button css={buttonStyles} onClick={() => setImageUrl(downloadUrl)}>
          Generate
        </button>
        <button
          css={buttonStyles}
          onClick={() => {
            console.log(downloadUrl);
            setImageUrl(downloadUrl);
            saveFile();
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
