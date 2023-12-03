import * as React from 'react';
interface KeyboradProps {
  shiftOn: boolean
}

export default function Keyboard(props: KeyboradProps) {
const { shiftOn } = props;
  return (
    <>
      <div id="virtual-keyboard">
        <div className="deco_key1"></div>
        <div className="key_1">1</div>
        <div className="key_2">2</div>
        <div className="key_3">3</div>
        <div className="key_4">4</div>
        <div className="key_5">5</div>
        <div className="key_6">6</div>
        <div className="key_7">7</div>
        <div className="key_8">8</div>
        <div className="key_9">9</div>
        <div className="key_0">0</div>
        <div className="key_hyphen">-</div>
        <div className="deco_key2">=</div>
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
        <div className="key_atmark">[</div>
        <div className="deco_key6">]</div>
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
        <div className="key_semicolon">;</div>
        <div className="key_colon">:</div>
        <div className="deco_key8">\</div>
        <div className="key_lShift">shift</div>
        <div className="key_z">Z</div>
        <div className="key_x">X</div>
        <div className="key_c">C</div>
        <div className="key_v">V</div>
        <div className="key_b">B</div>
        <div className="key_n">N</div>
        <div className="key_m">M</div>
        <div className="key_comma">,</div>
        <div className="key_period">.</div>
        <div className="key_slash">/</div>
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
      </div>
    </>
  );
};
