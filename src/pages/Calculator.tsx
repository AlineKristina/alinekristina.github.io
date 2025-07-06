import { useState } from 'react'
import { Calculator as CalcIcon, RefreshCw } from 'lucide-react'
import { calculateHP, calculateSP, calculateASPD, calculateDamage as calcDamage } from '../utils'

interface StatCalculation {
  level: number
  baseStats: {
    str: number
    agi: number
    vit: number
    int: number
    dex: number
    luk: number
  }
  jobBonus: {
    str: number
    agi: number
    vit: number
    int: number
    dex: number
    luk: number
  }
  equipment: {
    str: number
    agi: number
    vit: number
    int: number
    dex: number
    luk: number
  }
}

const Calculator = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'damage' | 'exp'>('stats')
  const [calculation, setCalculation] = useState<StatCalculation>({
    level: 99,
    baseStats: { str: 90, agi: 90, vit: 90, int: 90, dex: 90, luk: 90 },
    jobBonus: { str: 10, agi: 10, vit: 10, int: 10, dex: 10, luk: 10 },
    equipment: { str: 20, agi: 20, vit: 20, int: 20, dex: 20, luk: 20 }
  })

  const [damage, setDamage] = useState({
    attack: 1000,
    defense: 50,
    element: 'neutral',
    size: 'medium',
    race: 'demiHuman'
  })

  const [exp, setExp] = useState({
    currentExp: 50000,
    requiredExp: 100000,
    expGain: 1000
  })

  const totalStats = {
    str: calculation.baseStats.str + calculation.jobBonus.str + calculation.equipment.str,
    agi: calculation.baseStats.agi + calculation.jobBonus.agi + calculation.equipment.agi,
    vit: calculation.baseStats.vit + calculation.jobBonus.vit + calculation.equipment.vit,
    int: calculation.baseStats.int + calculation.jobBonus.int + calculation.equipment.int,
    dex: calculation.baseStats.dex + calculation.jobBonus.dex + calculation.equipment.dex,
    luk: calculation.baseStats.luk + calculation.jobBonus.luk + calculation.equipment.luk
  }

  const calculateDamage = () => {
    return calcDamage(damage.attack, damage.defense)
  }

  const calculatedHP = calculateHP(calculation.level, totalStats.vit)
  const calculatedSP = calculateSP(calculation.level, totalStats.int)
  const calculatedASPD = calculateASPD(totalStats.agi, totalStats.dex)

  const calculateExpToLevel = () => {
    return Math.ceil((exp.requiredExp - exp.currentExp) / exp.expGain)
  }

  const resetCalculation = () => {
    setCalculation({
      level: 99,
      baseStats: { str: 90, agi: 90, vit: 90, int: 90, dex: 90, luk: 90 },
      jobBonus: { str: 10, agi: 10, vit: 10, int: 10, dex: 10, luk: 10 },
      equipment: { str: 20, agi: 20, vit: 20, int: 20, dex: 20, luk: 20 }
    })
  }

  const tabs = [
    { id: 'stats', name: 'Stat Calculator', icon: CalcIcon },
    { id: 'damage', name: 'Damage Calculator', icon: CalcIcon },
    { id: 'exp', name: 'EXP Calculator', icon: CalcIcon }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">RO Calculators</h1>
        <button
          onClick={resetCalculation}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg p-1">
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stat Calculator */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Character Stats</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Level</label>
                <input
                  type="number"
                  value={calculation.level}
                  onChange={(e) => setCalculation({...calculation, level: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              {Object.entries(calculation.baseStats).map(([stat, value]) => (
                <div key={stat} className="grid grid-cols-4 gap-2 items-center">
                  <label className="text-gray-300 text-sm font-medium uppercase">{stat}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setCalculation({
                      ...calculation,
                      baseStats: { ...calculation.baseStats, [stat]: parseInt(e.target.value) }
                    })}
                    className="bg-gray-700 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="number"
                    value={calculation.jobBonus[stat as keyof typeof calculation.jobBonus]}
                    onChange={(e) => setCalculation({
                      ...calculation,
                      jobBonus: { ...calculation.jobBonus, [stat]: parseInt(e.target.value) }
                    })}
                    className="bg-gray-700 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="number"
                    value={calculation.equipment[stat as keyof typeof calculation.equipment]}
                    onChange={(e) => setCalculation({
                      ...calculation,
                      equipment: { ...calculation.equipment, [stat]: parseInt(e.target.value) }
                    })}
                    className="bg-gray-700 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Final Stats</h2>
            <div className="space-y-3">
              {Object.entries(totalStats).map(([stat, value]) => (
                <div key={stat} className="flex justify-between items-center">
                  <span className="text-gray-300 uppercase font-medium">{stat}</span>
                  <span className="text-white text-xl font-bold">{value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Derived Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">HP</span>
                  <span className="text-white">{calculatedHP}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">SP</span>
                  <span className="text-white">{calculatedSP}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">ASPD</span>
                  <span className="text-white">{calculatedASPD}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Damage Calculator */}
      {activeTab === 'damage' && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Damage Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Attack Power</label>
                <input
                  type="number"
                  value={damage.attack}
                  onChange={(e) => setDamage({...damage, attack: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Target Defense</label>
                <input
                  type="number"
                  value={damage.defense}
                  onChange={(e) => setDamage({...damage, defense: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Estimated Damage</h3>
              <div className="text-3xl font-bold text-red-400">{Math.floor(calculateDamage())}</div>
              <p className="text-gray-400 text-sm mt-1">Average damage per hit</p>
            </div>
          </div>
        </div>
      )}

      {/* EXP Calculator */}
      {activeTab === 'exp' && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">EXP Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Current EXP</label>
                <input
                  type="number"
                  value={exp.currentExp}
                  onChange={(e) => setExp({...exp, currentExp: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Required EXP</label>
                <input
                  type="number"
                  value={exp.requiredExp}
                  onChange={(e) => setExp({...exp, requiredExp: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">EXP per Kill</label>
                <input
                  type="number"
                  value={exp.expGain}
                  onChange={(e) => setExp({...exp, expGain: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Results</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-300">Kills needed to level up:</p>
                  <p className="text-2xl font-bold text-green-400">{calculateExpToLevel()}</p>
                </div>
                <div>
                  <p className="text-gray-300">Progress:</p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(exp.currentExp / exp.requiredExp) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {Math.floor((exp.currentExp / exp.requiredExp) * 100)}% complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calculator
