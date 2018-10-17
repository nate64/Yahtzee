const ROLL_DICE = 'ROLL_DICE'
const TOGGLE_KEPT = 'TOGGLE_KEPT'

const scores = [
  { section: 'upper', name: 'Ones', score: null, value: 1 },
  { section: 'upper', name: 'Twos', score: null, value: 2 },
  { section: 'upper', name: 'Threes', score: null, value: 3 },
  { section: 'upper', name: 'Fours', score: null, value: 4 },
  { section: 'upper', name: 'Fives', score: null, value: 5 },
  { section: 'upper', name: 'Sixes', score: null, value: 6 },
  { section: 'lower', name: 'Three Of A Kind', score: null, addAll: true },
  { section: 'lower', name: 'Four Of A Kind', score: null, addAll: true },
  { section: 'lower', name: 'Full House', score: null },
  { section: 'lower', name: 'Low Straight', score: null },
  { section: 'lower', name: 'High Straight', score: null },
  { section: 'lower', name: 'Yahtzee', score: null },
  { section: 'lower', name: 'Chance', score: null, addAll: true }
];

export const rollDice = () => {
  return (dispatch, getState) => {
    const { keep, dice } = getState().currentGame

    const newDice = dice.map( (d, i) => {
      if (keep.includes(i))
        return d
      return Math.floor(Math.random() * 6) + 1
    })

    dispatch({ type: ROLL_DICE, dice: newDice })
  }
}

export const toggleKept = (i) => {
  return (dispatch, getState) => {
    const { keep } = getState().currentGame
    let updated

    if (keep.includes(i))
      updated = keep.filter( d => d !== i )
    else
      updated = [...keep, i]

    dispatch({ type: TOGGLE_KEPT, keep: updated })
  }
}

export default (
  state = {
    roll: 0,
    dice: [...new Array(5)],
    keep: [],
    scores,
  },
  action
) => {
  switch(action.type) {
    case ROLL_DICE:
      return {
        ...state,
        dice: action.dice,
        roll: state.roll + 1
      }
    case TOGGLE_KEPT: 
      return {
        ...state,
        keep: action.keep
      }
    default:
      return state
  }
}