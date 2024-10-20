import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  const BUTTONS = [
    [
      { name: 'sen', isNumber: false },
      { name: 'cos', isNumber: false },
      { name: 'tan', isNumber: false },
      { name: 'deg', isNumber: false },
    ],
    [
      { name: 'ln', isNumber: false },
      { name: 'log', isNumber: false },
      { name: 'π', isNumber: false },
      { name: 'rad', isNumber: false },
    ],
    [
      { name: '1/X', isNumber: false },
      { name: '!', isNumber: false },
      { name: '√', isNumber: false },
      { name: '/', isNumber: false },
    ],
    [
      { name: '7', isNumber: true },
      { name: '8', isNumber: true },
      { name: '9', isNumber: true },
      { name: 'x', isNumber: false },
    ],
    [
      { name: '4', isNumber: true },
      { name: '5', isNumber: true },
      { name: '6', isNumber: true },
      { name: '-', isNumber: false },
    ],
    [
      { name: '1', isNumber: true },
      { name: '2', isNumber: true },
      { name: '3', isNumber: true },
      { name: '+', isNumber: false },
    ],
    [
      { name: 'C', isNumber: false },
      { name: '0', isNumber: true },
      { name: '.', isNumber: false },
      { name: '=', isNumber: false },
    ],
  ];

  const [screen, setScreen] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [pendingOp, setPendingOp] = useState('');

  const [lastNumber, setLastNumber] = useState();

  const handlePressBtnNumber = (btn) => {
    if (btn === '.') {
      if (!screen.includes('.')) {
        setScreen(screen + btn);
      }
    } else {
      if (screen == 0) {
        setScreen(btn);
      } else {
        setScreen(screen + btn);
      }

      if ((firstNumber === undefined || firstNumber == 0) && (pendingOp == '' || pendingOp == undefined)) {
        setFirstNumber(screen + btn);
      } else {
        setLastNumber(screen + btn);
      }
    }
  };

  const handlePressBtnAction = (btn) => {
    let result = handleOperation(btn);

    if (result === 'clear') {
      setScreen('0');
    } else {
      if (result === '.') return;
      result = result.toString();
      result = result.substring(0, 11);
      setScreen(result);
    }
  };

  function factorial(n) {
    if (n < 0) return undefined; // El factorial no está definido para números negativos
    if (n === 0 || n === 1) return 1; // El factorial de 0 o 1 es 1
    return n * factorial(n - 1);
  }

  const handleOperation = (btn) => {
    const screenContent = screen;

    let result;
    switch (btn) {
      case '.':
        handlePressBtnNumber(btn);
        return '.';
      case 'sen':
        result = Math.sin(screenContent);
        break;
      case 'cos':
        result = Math.cos(screenContent);
        break;
      case 'tan':
        result = Math.tan(screenContent);
        break;
      case 'deg':
        result = screenContent * (180 / Math.PI);
        break;
      case 'ln':
        result = Math.log(screenContent);
        break;
      case 'log':
        result = Math.log10(screenContent);
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'rad':
        result = screenContent * (Math.PI / 180);
        break;
      case '1/X':
        result = 1 / screenContent;
        break;
      case '!':
        if (screenContent < 0) {
          result = factorial(Math.round(screenContent * -1));
        } else {
          result = factorial(Math.round(screenContent));
        }
        break;
      case '√':
        result = Math.sqrt(screenContent);
        break;

      case '/':
      case 'x':
      case '-':
      case '+':
        setFirstNumber(screenContent);
        setPendingOp(btn);
        return 'clear';
        break;
      case '=':
        if (lastNumber == undefined || pendingOp == undefined) return '';
        if (pendingOp === '+') {
          return Number(firstNumber) + Number(lastNumber);
        }
        if (pendingOp === '-') {
          return firstNumber - lastNumber;
        }
        if (pendingOp === '*') {
          return firstNumber * lastNumber;
        }
        if ((pendingOp === '/') & (lastNumber != 0)) {
          return firstNumber / lastNumber;
        }
        break;

      case 'C':
        setScreen('0');
        setFirstNumber('');
        setPendingOp('');
        setLastNumber();

        return 'clear';

      default:
        result = 'Unknown operation';
    }
    return result;
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
      }}>
      <Text style={{ fontSize: 45, fontWeight: 'bold' }}>Calculadora</Text>

      <View style={{ marginTop: 5 }}>
        <View style={styles.screenStyle}>
          <Text style={{ fontSize: 50, textAlign: 'right', flex: 1 }}>
            {screen ? screen : 0}
          </Text>
        </View>

        {BUTTONS.map((element, index) => (
          <View
            key={'row ' + index.toString()}
            style={{ flexDirection: 'row' }}>
            {element.map((btn, index) => (
              <View key={index.toString() + btn.name} style={{ padding: 3 }}>
                {btn.isNumber ? (
                  <Pressable
                    style={styles.numberButtons}
                    onPress={() => handlePressBtnNumber(btn.name)}>
                    <Text style={styles.numberText}>{btn.name}</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.functionButtons}
                    onPress={() => handlePressBtnAction(btn.name)}>
                    <Text style={styles.fnText}>{btn.name}</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numberButtons: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#3260a8',
  },
  functionButtons: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#c5d3eb',
  },
  numberText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  fnText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  screenStyle: {
    flexDirection: 'row',
    marginBottom: 10,
    height: 70,
    width: 340,
    borderRadius: 4,
    borderWidth: 1,
  },
});
