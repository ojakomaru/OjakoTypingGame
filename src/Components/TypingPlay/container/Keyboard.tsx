import * as React from "react";
import { Ref, useCallback, useState } from "react";
import { HIDDEN, SHOW_RADIO } from "../../../@types";
import styled, { css } from "styled-components";
import { useWindowEvent } from "../../../Hooks";

interface KeyboardProps {
  ref?: Ref<HTMLDivElement>;
  $showKeyboard: SHOW_RADIO;
  className?: string;
}

type StyledKeyboardProps = Pick<KeyboardProps, "$showKeyboard">;
const StyleKeyboard = styled.div<StyledKeyboardProps>`
  ${({ $showKeyboard }) =>
    $showKeyboard === HIDDEN &&
    css`
      display: none;
    `};
  position: relative;
  width: 610px;
  margin: 0 auto;

  & div {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 1px solid #d8d8d8;
    border-radius: 3px;
    font-weight: bold;
    font-size: 20px;
    line-height: 34px;
    text-align: center;
    overflow: hidden;
  }

  & div.key_1,
  .key_exclamation {
    top: 0;
    left: 41px;
  }

  & div.key_2,
  .key_atmark {
    top: 0;
    left: 82px;
  }

  & div.key_3,
  .key_sharp {
    top: 0;
    left: 123px;
  }

  & div.key_4,
  .key_dollar {
    top: 0;
    left: 164px;
  }

  & div.key_5,
  .key_percnt {
    top: 0;
    left: 205px;
  }

  & div.key_6,
  .key_caret {
    top: 0;
    left: 246px;
  }

  & div.key_7,
  .key_and {
    top: 0;
    left: 287px;
  }

  & div.key_8,
  .key_aster {
    top: 0;
    left: 328px;
  }

  & div.key_9,
  .key_lper {
    top: 0;
    left: 369px;
  }

  & div.key_0,
  .key_rper {
    top: 0;
    left: 410px;
  }

  & div.key_hyphen,
  .key_underbar {
    top: 0;
    left: 451px;
  }

  & div.key_equal,
  .key_plus {
    top: 0;
    left: 492px;
  }

  & div.deco_key3 {
    top: 0;
    left: 533px;
  }

  & div.deco_key4 {
    top: 0;
    left: 574px;
  }

  & div.deco_key5 {
    top: 41px;
    width: 56px;
  }

  & div.key_q {
    top: 41px;
    left: 61px;
  }

  & div.key_w {
    top: 41px;
    left: 102px;
  }

  & div.key_e {
    top: 41px;
    left: 143px;
  }

  & div.key_r {
    top: 41px;
    left: 184px;
  }

  & div.key_t {
    top: 41px;
    left: 225px;
  }

  & div.key_y {
    top: 41px;
    left: 266px;
  }

  & div.key_u {
    top: 41px;
    left: 307px;
  }

  & div.key_i {
    top: 41px;
    left: 348px;
  }

  & div.key_o {
    top: 41px;
    left: 389px;
  }

  & div.key_p {
    top: 41px;
    left: 430px;
  }

  & div.key_lbrack {
    top: 41px;
    left: 471px;
  }

  & div.key_rbrack {
    top: 41px;
    left: 512px;
  }

  & div.key_Enter {
    top: 41px;
    left: 553px;
    width: 57px;
    height: 77px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 21px 100%, 21px 36px, 0 36px);
  }

  & div.key_Enter:after {
    position: absolute;
    display: block;
    content: "";
    top: 34px;
    left: 0;
    width: 20px;
    height: 41px;
    border-top: 1px solid #d8d8d8;
    border-right: 1px solid #d8d8d8;
  }

  & div.deco_key7 {
    top: 82px;
    width: 76px;
  }

  & div.key_a {
    top: 82px;
    left: 81px;
  }

  & div.key_s {
    top: 82px;
    left: 122px;
  }

  & div.key_d {
    top: 82px;
    left: 163px;
  }

  & div.key_f {
    top: 82px;
    left: 204px;
  }

  & div.key_g {
    top: 82px;
    left: 245px;
  }

  & div.key_h {
    top: 82px;
    left: 286px;
  }

  & div.key_j {
    top: 82px;
    left: 327px;
  }

  & div.key_k {
    top: 82px;
    left: 368px;
  }

  & div.key_l {
    top: 82px;
    left: 409px;
  }

  & div.key_semicolon,
  .key_colon {
    top: 82px;
    left: 450px;
  }

  & div.key_singlequotation,
  .key_doublequotation {
    top: 82px;
    left: 491px;
  }

  & div.key_backslash,
  .key_pipe {
    top: 82px;
    left: 532px;
  }

  & div.key_lShift {
    top: 123px;
    left: 0;
    width: 96px;
  }

  & div.key_z {
    top: 123px;
    left: 101px;
  }

  & div.key_x {
    top: 123px;
    left: 142px;
  }

  & div.key_c {
    top: 123px;
    left: 183px;
  }

  & div.key_v {
    top: 123px;
    left: 224px;
  }

  & div.key_b {
    top: 123px;
    left: 265px;
  }

  & div.key_n {
    top: 123px;
    left: 306px;
  }

  & div.key_m {
    top: 123px;
    left: 347px;
  }

  & div.key_comma,
  .key_less {
    top: 123px;
    left: 388px;
  }

  & div.key_period,
  .key_more {
    top: 123px;
    left: 429px;
  }

  & div.key_slash,
  .key_question {
    top: 123px;
    left: 470px;
  }

  & div.deco_key9 {
    top: 123px;
    left: 511px;
  }

  & div.key_rShift {
    top: 123px;
    left: 552px;
    width: 58px;
  }

  & div.deco_key10 {
    top: 164px;
    left: 0;
    width: 56px;
  }

  & div.deco_key11 {
    top: 164px;
    left: 61px;
  }

  & div.deco_key12 {
    top: 164px;
    left: 102px;
  }

  & div.deco_key13 {
    top: 164px;
    left: 143px;
  }

  & div.key_space {
    top: 164px;
    left: 184px;
    width: 181px;
  }

  & div.deco_key14 {
    top: 164px;
    left: 370px;
  }

  & div.deco_key15 {
    top: 164px;
    left: 411px;
  }

  & div.deco_key16 {
    top: 164px;
    left: 452px;
    width: 56px;
  }

  & div.deco_key17 {
    top: 164px;
    left: 513px;
  }

  & div.deco_key18 {
    top: 164px;
    left: 554px;
    width: 56px;
  }

  & div.active {
    background-color: #ff9c00 !important;
    border-color: #ff9c00 !important;
    color: #fff !important;
  }
  &::after {
    content: "";
    display: block;
    padding-top: 38%;
  }
`;

function KeyboardCore(props: KeyboardProps, ref: Ref<HTMLDivElement>) {
  const [shift, setShift] = useState<boolean>(false);
  const { className, $showKeyboard } = props;

  const shiftToggle = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setShift((shift) => !shift);
    }
  }, []);
  useWindowEvent("keydown", shiftToggle, []);
  useWindowEvent("keyup", shiftToggle, []);

  return (
    <StyleKeyboard
      ref={ref}
      id="virtual-keyboard"
      className={className}
      $showKeyboard={$showKeyboard}
    >
      <div className="key_backquote key_childa">{shift ? "~" : "`"}</div>
      <div className="key_1 key_exclamation">{shift ? "!" : "1"}</div>
      <div className="key_2 key_atmark">{shift ? "@" : "2"}</div>
      <div className="key_3 key_sharp">{shift ? "#" : "3"}</div>
      <div className="key_4 key_dollar">{shift ? "$" : "4"}</div>
      <div className="key_5 key_percnt">{shift ? "%" : "5"}</div>
      <div className="key_6 key_caret">{shift ? "^" : "6"}</div>
      <div className="key_7 key_and">{shift ? "&" : "7"}</div>
      <div className="key_8 key_aster">{shift ? "*" : "8"}</div>
      <div className="key_9 key_lper">{shift ? "(" : "9"}</div>
      <div className="key_0 key_rper">{shift ? ")" : "0"}</div>
      <div className="key_hyphen key_underbar">{shift ? "_" : "-"}</div>
      <div className="key_equal key_plus">{shift ? "+" : "="}</div>
      <div className="deco_key3">bk</div>
      <div className="deco_key4"></div>
      <div className="deco_key5"></div>
      <div className="key_q">Q</div>
      <div className="key_w">W</div>
      <div className="key_e">E</div>
      <div className="key_r">R</div>
      <div className="key_t">T</div>
      <div className="key_y">Y</div>
      <div className="key_u">U</div>
      <div className="key_i">I</div>
      <div className="key_o">O</div>
      <div className="key_p">P</div>
      <div className="key_lbrack key_lbraces">{shift ? "{" : "["}</div>
      <div className="key_rbrack key_rbraces">{shift ? "}" : "]"}</div>
      <div className="key_Enter"></div>
      <div className="deco_key7"></div>
      <div className="key_a">A</div>
      <div className="key_s">S</div>
      <div className="key_d">D</div>
      <div className="key_f">F</div>
      <div className="key_g">G</div>
      <div className="key_h">H</div>
      <div className="key_j">J</div>
      <div className="key_k">K</div>
      <div className="key_l">L</div>
      <div className="key_semicolon key_colon">{shift ? ":" : ";"}</div>
      <div className="key_doublequotation key_singlequotation">
        {shift ? '"' : "'"}
      </div>
      <div className="key_pipe key_backslash">{shift ? "|" : "\\"}</div>
      <div className="key_lShift">shift</div>
      <div className="key_z">Z</div>
      <div className="key_x">X</div>
      <div className="key_c">C</div>
      <div className="key_v">V</div>
      <div className="key_b">B</div>
      <div className="key_n">N</div>
      <div className="key_m">M</div>
      <div className="key_comma key_less">{shift ? "<" : ","}</div>
      <div className="key_period key_more">{shift ? ">" : "."}</div>
      <div className="key_slash key_question">{shift ? "?" : "/"}</div>
      <div className="deco_key9"></div>
      <div className="key_rShift">shift</div>
      <div className="deco_key10"></div>
      <div className="deco_key11"></div>
      <div className="deco_key12"></div>
      <div className="deco_key13"></div>
      <div className="key_space">space</div>
      <div className="deco_key14"></div>
      <div className="deco_key15"></div>
      <div className="deco_key16"></div>
      <div className="deco_key17"></div>
      <div className="deco_key18"></div>
    </StyleKeyboard>
  );
}

export const Keyboard = React.forwardRef<HTMLDivElement, KeyboardProps>(
  KeyboardCore
);
