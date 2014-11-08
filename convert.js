"use strict";
console.log('Convertation!');

var NIL = 0x0000;

var MAP_LENGTH = 37;
var COMB_MAP_LENGTH = 4;
var TRANS_CHARS_LENGTH = 39;


var CharRep = {
  code: 0,
  mIsolated: 0,
  mInitial: 0,
  mMedial: 0,
  mFinal: 0
};


var CombCharRep = {
  code: 0,
  mIsolated: 0,
  mInitial: 0,
  mMedial: 0,
  mFinal: 0
};

var charsMap = [
  [0x0621, 0xFE80, NIL, NIL, NIL], /* HAMZA */
  [0x0622, 0xFE81, NIL, NIL, 0xFE82], /* ALEF_MADDA */
  [0x0623, 0xFE83, NIL, NIL, 0xFE84], /* ALEF_HAMZA_ABOVE */
  [0x0624, 0xFE85, NIL, NIL, 0xFE86], /* WAW_HAMZA */
  [0x0625, 0xFE87, NIL, NIL, 0xFE88], /* ALEF_HAMZA_BELOW */
  [0x0626, 0xFE89, 0xFE8B, 0xFE8C, 0xFE8A], /* YEH_HAMZA */
  [0x0627, 0xFE8D, NIL, NIL, 0xFE8E], /* ALEF */
  [0x0628, 0xFE8F, 0xFE91, 0xFE92, 0xFE90], /* BEH */
  [0x0629, 0xFE93, NIL, NIL, 0xFE94], /* TEH_MARBUTA */
  [0x062A, 0xFE95, 0xFE97, 0xFE98, 0xFE96], /* TEH */
  [0x062B, 0xFE99, 0xFE9B, 0xFE9C, 0xFE9A], /* THEH */
  [0x062C, 0xFE9D, 0xFE9F, 0xFEA0, 0xFE9E], /* JEEM */
  [0x062D, 0xFEA1, 0xFEA3, 0xFEA4, 0xFEA2], /* HAH */
  [0x062E, 0xFEA5, 0xFEA7, 0xFEA8, 0xFEA6], /* KHAH */
  [0x062F, 0xFEA9, NIL, NIL, 0xFEAA], /* DAL */
  [0x0630, 0xFEAB, NIL, NIL, 0xFEAC], /* THAL */
  [0x0631, 0xFEAD, NIL, NIL, 0xFEAE], /* REH */
  [0x0632, 0xFEAF, NIL, NIL, 0xFEB0], /* ZAIN */
  [0x0633, 0xFEB1, 0xFEB3, 0xFEB4, 0xFEB2], /* SEEN */
  [0x0634, 0xFEB5, 0xFEB7, 0xFEB8, 0xFEB6], /* SHEEN */
  [0x0635, 0xFEB9, 0xFEBB, 0xFEBC, 0xFEBA], /* SAD */
  [0x0636, 0xFEBD, 0xFEBF, 0xFEC0, 0xFEBE], /* DAD */
  [0x0637, 0xFEC1, 0xFEC3, 0xFEC4, 0xFEC2], /* TAH */
  [0x0638, 0xFEC5, 0xFEC7, 0xFEC8, 0xFEC6], /* ZAH */
  [0x0639, 0xFEC9, 0xFECB, 0xFECC, 0xFECA], /* AIN */
  [0x063A, 0xFECD, 0xFECF, 0xFED0, 0xFECE], /* GHAIN */
  [0x0640, 0x0640, NIL, NIL, NIL], /* TATWEEL */
  [0x0641, 0xFED1, 0xFED3, 0xFED4, 0xFED2], /* FEH */
  [0x0642, 0xFED5, 0xFED7, 0xFED8, 0xFED6], /* QAF */
  [0x0643, 0xFED9, 0xFEDB, 0xFEDC, 0xFEDA], /* KAF */
  [0x0644, 0xFEDD, 0xFEDF, 0xFEE0, 0xFEDE], /* LAM */
  [0x0645, 0xFEE1, 0xFEE3, 0xFEE4, 0xFEE2], /* MEEM */
  [0x0646, 0xFEE5, 0xFEE7, 0xFEE8, 0xFEE6], /* NOON */
  [0x0647, 0xFEE9, 0xFEEB, 0xFEEC, 0xFEEA], /* HEH */
  [0x0648, 0xFEED, NIL, NIL, 0xFEEE], /* WAW */
//[ 0x0649, 0xFEEF, 0xFBE8, 0xFBE9, 0xFEF0 ],    /* ALEF_MAKSURA */
  [0x0649, 0xFEEF, NIL, NIL, 0xFEF0], /* ALEF_MAKSURA */
  [0x064A, 0xFEF1, 0xFEF3, 0xFEF4, 0xFEF2] /* YEH */
];

var combCharsMap = [
      [[0x0644, 0x0622], 0xFEF5, NIL, NIL, 0xFEF6], /* LAM_ALEF_MADDA */
      [[0x0644, 0x0623], 0xFEF7, NIL, NIL, 0xFEF8], /* LAM_ALEF_HAMZA_ABOVE */
      [[0x0644, 0x0625], 0xFEF9, NIL, NIL, 0xFEFA], /* LAM_ALEF_HAMZA_BELOW */
      [[0x0644, 0x0627], 0xFEFB, NIL, NIL, 0xFEFC] /* LAM_ALEF */
    ];

var transChars = [
      0x0610, /* ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM */
      0x0612, /* ARABIC SIGN ALAYHE ASSALLAM */
      0x0613, /* ARABIC SIGN RADI ALLAHOU ANHU */
      0x0614, /* ARABIC SIGN TAKHALLUS */
      0x0615, /* ARABIC SMALL HIGH TAH */
      0x064B, /* ARABIC FATHATAN */
      0x064C, /* ARABIC DAMMATAN */
      0x064D, /* ARABIC KASRATAN */
      0x064E, /* ARABIC FATHA */
      0x064F, /* ARABIC DAMMA */
      0x0650, /* ARABIC KASRA */
      0x0651, /* ARABIC SHADDA */
      0x0652, /* ARABIC SUKUN */
      0x0653, /* ARABIC MADDAH ABOVE */
      0x0654, /* ARABIC HAMZA ABOVE */
      0x0655, /* ARABIC HAMZA BELOW */
      0x0656, /* ARABIC SUBSCRIPT ALEF */
      0x0657, /* ARABIC INVERTED DAMMA */
      0x0658, /* ARABIC MARK NOON GHUNNA */
      0x0670, /* ARABIC LETTER SUPERSCRIPT ALEF */
      0x06D6, /* ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA */
      0x06D7, /* ARABIC SMALL HIGH LIGATURE QAF WITH LAM WITH ALEF MAKSURA */
      0x06D8, /* ARABIC SMALL HIGH MEEM INITIAL FORM */
      0x06D9, /* ARABIC SMALL HIGH LAM ALEF */
      0x06DA, /* ARABIC SMALL HIGH JEEM */
      0x06DB, /* ARABIC SMALL HIGH THREE DOTS */
      0x06DC, /* ARABIC SMALL HIGH SEEN */
      0x06DF, /* ARABIC SMALL HIGH ROUNDED ZERO */
      0x06E0, /* ARABIC SMALL HIGH UPRIGHT RECTANGULAR ZERO */
      0x06E1, /* ARABIC SMALL HIGH DOTLESS HEAD OF KHAH */
      0x06E2, /* ARABIC SMALL HIGH MEEM ISOLATED FORM */
      0x06E3, /* ARABIC SMALL LOW SEEN */
      0x06E4, /* ARABIC SMALL HIGH MADDA */
      0x06E7, /* ARABIC SMALL HIGH YEH */
      0x06E8, /* ARABIC SMALL HIGH NOON */
      0x06EA, /* ARABIC EMPTY CENTRE LOW STOP */
      0x06EB, /* ARABIC EMPTY CENTRE HIGH STOP */
      0x06EC, /* ARABIC ROUNDED HIGH STOP WITH FILLED CENTRE */
      0x06ED /* ARABIC SMALL LOW MEEM */
    ];


/**
 * TODO rename into camelCase
 * @param code
 * @returns {boolean}
 */
function CharacterMapContains(code)
{
  for (var i = 0; i < MAP_LENGTH; i++)
  {
    if (charsMap[i].code === code) {
      return true;
    }
  }

  return false;
}

/**
 * TODO rename into camelCase
 * @param code
 * @returns {CharRep}
 */
function GetCharRep(code)
{
  for (var i = 0; i < MAP_LENGTH; i++)
  {
    if (charsMap[i].code === code) {
      return charsMap[i];
    }
  }

  //FIXME CharRep object
  return [ NIL, NIL, NIL, NIL ];
}


/**
 *
 * @param code1
 * @param code2
 * @returns {CombCharRep}
 */
function  GetCombCharRep( code1, code2)
{
  for (var i = 0; i < COMB_MAP_LENGTH; i++)
  {
    if (combCharsMap[i].code[0] === code1 && combCharsMap[i].code[1] === code2) {
      return combCharsMap[i];
    }
  }

  //FIXME CombCharRep object
  return [[ NIL, NIL ], NIL, NIL, NIL ];
}

/**
 *
 * @param code
 * @returns {boolean}
 * @constructor
 */
function IsTransparent(code)
{
  for (var i = 0; i < TRANS_CHARS_LENGTH; i++)
  {
    if (transChars[i] === code) {
      return true;
    }
  }
  return false;
}

