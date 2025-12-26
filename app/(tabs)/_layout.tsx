import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

// Matematiksel fonksiyonlar
const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0) throw new Error("Faktöriyel negatif veya ondalıklı sayı için alınamaz!");
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

const sqrt = (n: number): number => {
  if (n < 0) throw new Error("Negatif sayının karekökü alınamaz!");
  return Math.sqrt(n);
};

const log = (n: number, base: number = 10): number => {
  if (n <= 0) throw new Error("Logaritma yalnızca pozitif sayılar için alınabilir!");
  return Math.log(n) / Math.log(base);
};

const trig = (type: 'sin'|'cos'|'tan', deg: number): number => {
  const rad = deg * (Math.PI / 180);
  switch(type){
    case 'sin': return Math.sin(rad);
    case 'cos': return Math.cos(rad);
    case 'tan': return Math.tan(rad);
  }
};

export default function App() {
  const [display, setDisplay] = useState<string>('');

  const handlePress = (value: string) => setDisplay(display + value);

  const clear = () => setDisplay('');

  const calculate = (operation?: string) => {
    try {
      let result: number | string = 0;
      if(operation === 'sqrt') result = sqrt(Number(display));
      else if(operation === 'factorial') result = factorial(Number(display));
      else if(operation?.startsWith('log')) {
        const parts = operation.split(':');
        const base = parts[1] ? Number(parts[1]) : 10;
        result = log(Number(display), base);
      }
      else if(['sin','cos','tan'].includes(operation || '')) {
        result = trig(operation as 'sin'|'cos'|'tan', Number(display));
      }
      else {
        // Basit matematiksel ifade
        result = eval(display);
      }
      setDisplay(result.toString());
    } catch(e: any) {
      Alert.alert('Hata', e.message);
    }
  };

  // Buton dizisi
  const buttons: string[][] = [
    ['7','8','9','/'],
    ['4','5','6','*'],
    ['1','2','3','-'],
    ['0','.','=','+'],
    ['C','√','!','log','sin','cos','tan']
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      {buttons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((button: string) => (
            <TouchableOpacity
              key={button}
              style={styles.button}
              onPress={() => {
                if(button === '=') calculate();
                else if(button === 'C') clear();
                else if(button === '√') calculate('sqrt');
                else if(button === '!') calculate('factorial');
                else if(button === 'log') calculate('log'); // base default 10
                else if(['sin','cos','tan'].includes(button)) calculate(button);
                else handlePress(button);
              }}
            >
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5f5f5',
    justifyContent:'flex-end',
    padding:10
  },
  displayContainer: {
    minHeight:120,
    justifyContent:'center',
    alignItems:'flex-end',
    padding:20,
    backgroundColor:'#e5e7eb',
    borderRadius:15,
    marginBottom:20
  },
  displayText: {
    fontSize:40,
    fontWeight:'bold',
    color:'#111827'
  },
  row: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10,
    flexWrap:'wrap'
  },
  button: {
    flex:1,
    backgroundColor:'#3b82f6',
    margin:5,
    justifyContent:'center',
    alignItems:'center',
    height:70,
    borderRadius:20,
    shadowColor:'#000',
    shadowOpacity:0.3,
    shadowOffset:{width:2,height:2},
    shadowRadius:4,
    elevation:5
  },
  buttonText: {
    fontSize:20,
    color:'#fff',
    fontWeight:'bold'
  }
});
