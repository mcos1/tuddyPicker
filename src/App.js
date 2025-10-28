import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import './App.css';
import { mockData } from './data/mockData';

const TuddyPicker = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = [
    {
    name: 'Quarterbacks',
    stats: [
      'Passing Yards',
      'Passing Touchdowns',
      'Interceptions Thrown',
      'Rushing Yards (QB)',
      'Rushing Touchdowns (QB)',
      'Completion Percentage',
      'Passer Rating',
    ],
  },
    {
      name: 'Running Backs',
      stats: [
        'Touchdowns (Rushing/Receiving)',
        'Rushing Yards',
      ]
    },
    {
      name: 'Wide Receivers',
      stats: [
        'WR1 Touchdowns',
        'WR1 Yards',
        'WR2/3 Touchdowns',
        'WR2/3 Yards',
      ]
    },
    {
      name: 'Tight Ends',
      stats: [
        'Receiving Touchdowns',
        'Receiving Yards',
      ]
    },
    {
      name: 'Defense Allowed',
      stats: [
        'RB Touchdowns Allowed',
        'Rushing Yards Allowed',
        'Receiving Touchdowns Allowed (WR/TE)',
        'Receiving Yards Allowed (WR/TE)',
        'TE Touchdowns Allowed',
        'TE Yards Allowed',
        'WR2/3 Touchdowns Allowed',
        'WR2/3 Yards Allowed',
      ]
    }
  ];

  const getDataForCategory = () => {
  if (!selectedCategory) return [];

  const [categoryName, statName] = selectedCategory.split('-').map(s => s.trim());

  switch (categoryName) {
    case 'Quarterbacks':
      return mockData.quarterbacks;
    case 'Running Backs':
      return mockData.runningBacks;
    case 'Wide Receivers':
      return mockData.wideReceivers;
    case 'WR2/WR3':
      return mockData.wr2_3;
    case 'Tight Ends':
      return mockData.tightEnds;
    case 'Defense Allowed':
      return mockData.defenseAllowed;
    default:
      return [];
  }
};

const renderTable = () => {
  const data = getDataForCategory();
  if (!data.length) return null;

  const [categoryName, statName] = selectedCategory.split('-').map(s => s.trim());

  // Figure out which stat field to show based on the selected stat
  let statKey = '';
  if (categoryName === 'Quarterbacks') {
    if (statName === 'Passing Yards') statKey = 'passingYards';
    else if (statName === 'Passing Touchdowns') statKey = 'passingTouchdowns';
    else if (statName === 'Interceptions Thrown') statKey = 'interceptions';
    else if (statName === 'Rushing Yards (QB)') statKey = 'rushingYards';
    else if (statName === 'Rushing Touchdowns (QB)') statKey = 'rushingTouchdowns';
    else if (statName === 'Completion Percentage') statKey = 'completionPercentage';
    else if (statName === 'Passer Rating') statKey = 'passerRating';
  }

  if (categoryName === 'Running Backs') {
    if (statName === 'Touchdowns (Rushing/Receiving)') statKey = 'touchdowns';
    else if (statName === 'Rushing Yards') statKey = 'rushingYards';
  }

  if (categoryName === 'Wide Receivers') {
    if (statName === 'WR1 Touchdowns') statKey = 'touchdowns';
    else if (statName === 'WR1 Yards') statKey = 'receivingYards';
  }

  if (categoryName === 'WR2/WR3') {
    if (statName === 'WR2/3 Touchdowns') statKey = 'receivingTouchdowns';
    else if (statName === 'WR2/3 Yards') statKey = 'receivingYards';
  }

  if (categoryName === 'Tight Ends') {
    if (statName === 'Receiving Touchdowns') statKey = 'receivingTouchdowns';
    else if (statName === 'Receiving Yards') statKey = 'receivingYards';
  }

  if (categoryName === 'Defense Allowed') {
    if (statName === 'RB Touchdowns Allowed') statKey = 'rbTouchdownsAllowed';
    else if (statName === 'Rushing Yards Allowed') statKey = 'rushingYardsAllowedPerGame';
    else if (statName === 'Receiving Touchdowns Allowed (WR/TE)') statKey = 'receivingTouchdownsAllowedWRTE';
    else if (statName === 'Receiving Yards Allowed (WR/TE)') statKey = 'receivingYardsAllowedWRTEPerGame';
    else if (statName === 'TE Touchdowns Allowed') statKey = 'teTouchdownsAllowed';
    else if (statName === 'TE Yards Allowed') statKey = 'teYardsAllowedPerGame';
    else if (statName === 'WR2/3 Touchdowns Allowed') statKey = 'wr23TouchdownsAllowed';
    else if (statName === 'WR2/3 Yards Allowed') statKey = 'wr23YardsAllowedPerGame';
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>{categoryName === 'Defense Allowed' ? 'Team' : 'Player'}</th>
          <th>Team</th>
          <th>{statName}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.name || item.team}</td>
            <td>{item.team || '-'}</td>
            <td>
              {item.stats[statKey] !== undefined
                ? item.stats[statKey]
                : 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h1 className="title">TuddyPicker</h1>
        <button className="settings-btn">
          <Settings size={24} />
        </button>
      </div>

     <div className="main-content">
  <div className="card">
    <h2 className="card-title">Choose a Stat Category</h2>

    {/* The only dropdown we need */}
    <div className="select-wrapper">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
        onClick={(e) => e.currentTarget.classList.toggle('open')}
      >
        <option value="">Select a Category...</option>
        {categories.map((category, idx) => (
          <optgroup key={idx} label={category.name}>
            {category.stats.map((stat, statIdx) => (
              <option key={statIdx} value={`${category.name}-${stat}`}>
                {stat}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <span className="select-arrow"></span>
    </div>

    {/* ✅ Keep only this part below to show your selection */}
    {selectedCategory && (
      <div className="selection-display">
        <p className="selected-text">
          <span className="label">Selected:</span>{' '}
          {selectedCategory.split('-')[1]}
        </p>
        <p className="category-text">
          Category: {selectedCategory.split('-')[0]}
        </p>
      </div>
    )}
    {selectedCategory && renderTable()}
  </div>
</div>


    </div>
  );
};

export default TuddyPicker;