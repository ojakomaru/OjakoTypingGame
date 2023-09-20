import React from "react";

const SettingModal = (props) => {
  const buttonClick = () => props.setShowModal(false);
  // HTML
  return (
    <>
      {props.showFlag ? (
        <div id="game-func">
          <span>ローマ字表示(R)</span>
          <div class="switch-btn">
            <button class="on-btn btn show" type="button">
              ON
            </button>
            <button class="off-btn btn" type="button">
              OFF
            </button>
          </div>
          <span>かな表示(K)</span>
          <div class="switch-btn">
            <button class="on-btn btn show" type="button">
              ON
            </button>
            <button class="off-btn btn" type="button">
              OFF
            </button>
          </div>
          <span>キーガイド(G)</span>
          <div class="switch-btn">
            <button class="on-btn btn show" type="button">
              ON
            </button>
            <button class="off-btn btn" type="button">
              OFF
            </button>
          </div>
          <span>WPM表示(W)</span>
          <div class="switch-btn">
            <button class="on-btn btn show" type="button">
              ON
            </button>
            <button class="off-btn btn" type="button">
              OFF
            </button>
          </div>
          <span>スピードバー(S)</span>
          <div class="switch-btn">
            <button class="on-btn btn show" type="button">
              ON
            </button>
            <button class="off-btn btn" type="button">
              OFF
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SettingModal;
