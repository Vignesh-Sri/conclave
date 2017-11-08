import CRDT from '../lib/crdt';
import * as Util from './util';
import fs from 'fs';

const logPath = 'performance/logs'
const siteId = Math.floor(Math.random() * 1000);
const mockController = {
  siteId: siteId,
  broadcastInsertion: function() {},
  broadcastDeletion: function() {},
  updateEditor: function() {},
}

const crdt1 = new CRDT(mockController);
const crdt2 = new CRDT(mockController);
const crdt3 = new CRDT(mockController);
const crdt4 = new CRDT(mockController);
const crdt5 = new CRDT(mockController);

let table = `
#### PERFORMANCE METRICS
======================================================================================

## RANDOM
---------

# INSERTIONS
---------------------------------------------------------------------------------------
|  # of Operations  |  Total Execute Time   | Avg. Operation Time  |  Avg. ID Length  |
|                   |   (in milliseconds)   |  (in milliseconds)   |                  |
---------------------------------------------------------------------------------------
${Util.addInsertRow(10, crdt1, Util.insertRandom)}
${Util.addInsertRow(100, crdt2, Util.insertRandom)}
${Util.addInsertRow(1000, crdt3, Util.insertRandom)}
${Util.addInsertRow(10000, crdt4, Util.insertRandom)}
${Util.addInsertRow(100000, crdt5, Util.insertRandom)}


# DELETIONS
--------------------------------------------------------------------
|  # of Operations  |  Total Execute Time   | Avg. Operation Time  |
|                   |   (in milliseconds)   |  (in milliseconds)   |
--------------------------------------------------------------------
${Util.addDeleteRow(10, crdt1, Util.deleteRandom)}
${Util.addDeleteRow(100, crdt2, Util.deleteRandom)}
${Util.addDeleteRow(1000, crdt3, Util.deleteRandom)}
${Util.addDeleteRow(10000, crdt4, Util.deleteRandom)}
${Util.addDeleteRow(100000, crdt5, Util.deleteRandom)}


## AT THE BEGINNING
-------------------


# INSERTIONS
---------------------------------------------------------------------------------------
|  # of Operations  |  Total Execute Time   | Avg. Operation Time  |  Avg. ID Length  |
|                   |   (in milliseconds)   |  (in milliseconds)   |                  |
---------------------------------------------------------------------------------------
${Util.addInsertRow(10, crdt1, Util.insertBeginning)}
${Util.addInsertRow(100, crdt2, Util.insertBeginning)}
${Util.addInsertRow(1000, crdt3, Util.insertBeginning)}
${Util.addInsertRow(10000, crdt4, Util.insertBeginning)}
${Util.addInsertRow(100000, crdt5, Util.insertBeginning)}

# DELETIONS
--------------------------------------------------------------------
|  # of Operations  |  Total Execute Time   | Avg. Operation Time  |
|                   |   (in milliseconds)   |  (in milliseconds)   |
--------------------------------------------------------------------
${Util.addDeleteRow(10, crdt1, Util.deleteBeginning)}
${Util.addDeleteRow(100, crdt2, Util.deleteBeginning)}
${Util.addDeleteRow(1000, crdt3, Util.deleteBeginning)}
${Util.addDeleteRow(10000, crdt4, Util.deleteBeginning)}
${Util.addDeleteRow(100000, crdt5, Util.deleteBeginning)}


## AT THE END
-------------

# INSERTIONS
---------------------------------------------------------------------------------------
|  # of Operations  |  Total Execute Time   | Avg. Operation Time  |  Avg. ID Length  |
|                   |   (in milliseconds)   |  (in milliseconds)   |                  |
---------------------------------------------------------------------------------------
${Util.addInsertRow(10, crdt1, Util.insertEnd)}
${Util.addInsertRow(100, crdt2, Util.insertEnd)}
${Util.addInsertRow(1000, crdt3, Util.insertEnd)}
${Util.addInsertRow(10000, crdt4, Util.insertEnd)}
${Util.addInsertRow(100000, crdt5, Util.insertEnd)}

# DELETIONS
--------------------------------------------------------------------
|  # of Operations  |  Total Execute Time   | Avg. Operation Time  |
|                   |   (in milliseconds)   |  (in milliseconds)   |
--------------------------------------------------------------------
${Util.addDeleteRow(10, crdt1, Util.deleteEnd)}
${Util.addDeleteRow(100, crdt2, Util.deleteEnd)}
${Util.addDeleteRow(1000, crdt3, Util.deleteEnd)}
${Util.addDeleteRow(10000, crdt4, Util.deleteEnd)}
${Util.addDeleteRow(100000, crdt5, Util.deleteEnd)}
`;

fs.writeFile(`${logPath}/${Util.getTimestamp()}.log`, table, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log(`Results saved to ${logPath}`)
})
