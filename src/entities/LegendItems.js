import LegendItem from "./LengendItem";

var legendItems = [
  new LegendItem(
    "Very High",
    "#BD0026",
    (cases) => cases >= 1_000_000,
    "white"
  ),

  new LegendItem(
    "High",
    "#F03B20",
    (cases) => cases >= 500_000 && cases < 1_000_000,
    "White"
  ),

  new LegendItem(
    "Middle",
    "#FD8D3C",
    (cases) => cases >= 200_000 && cases < 500_000
  ),

  new LegendItem(
    "Low",
    "#FECC5C",
    (cases) => cases >= 50_000 && cases < 200_000
  ),

  new LegendItem(
    "Very Low",
    "#FFFFB2",
    (cases) => cases > 0 && cases < 50_000
  ),

  new LegendItem("Potential Level", "#ffffff", (cases) => true),
];

export default legendItems;

/**
 * 7 > 1 million                        #8b0000
 * 6 >= 500 thousand < 1 million        #9e2a2a
 * 5 >= 200 thousand < 500 thousand     #b15555
 * 4 >= 100 thousand  < 200 Thousand    #c57f7f
 * 3 > 50 thousand < 100 thousand       #d8aaaa
 * 2 >= 0 < 50 thousand                 #ebd4d4
 * 1 NO DATA                            #ffffff
 */

/*
#741f1f // Really red
#9c2929 // more red
#c57f7f // red
#d8aaaa //more pink
#ebd4d4 //pink
#ffffff //white
*/