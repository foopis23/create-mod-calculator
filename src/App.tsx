import './App.css'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { CrushingRecipeSelect } from './components/crushing-recipie-select'
import { useState } from 'react'
import { CrushingRecipe } from './lib/recipes/crushing'
import { Input } from './components/ui/input'
import { Label } from '@radix-ui/react-label'
import { calculateThroughput } from './lib/recipes'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './components/ui/table'


function App() {
  const [crushingWheelRecipe, setCrushingWheelRecipe] = useState<CrushingRecipe | undefined>(undefined)
  const [rpm, setRpm] = useState<number>(16)
  const [stackSize, setStackSize] = useState<number>(64)
  const inputDelay = 3;

  const throughput = crushingWheelRecipe !== undefined
    ? calculateThroughput(crushingWheelRecipe, { rpm, stackSize, inputDelay })
    : null;

  return (
    <div className="max-w-xl mx-auto pt-8">
      <Card>
        <CardHeader>
          <CardTitle>Crushing Wheel Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full text-left mb-4">
            <Label>Recipe</Label>
            <div>
              <CrushingRecipeSelect
                value={crushingWheelRecipe}
                onChange={setCrushingWheelRecipe}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full text-left mb-4">
              <Label htmlFor="rpm">RPM</Label>
              <Input type="number" id="rpm" placeholder="RPM" min={1} max={256} value={rpm} onChange={(e) => setRpm(parseInt(e.target.value))} />
            </div>
            <div className="w-full text-left mb-4">
              <Label htmlFor="rpm">Stack Size</Label>
              <Input type="number" id="stack-size" placeholder="Stack Size" min={1} max={64} value={stackSize} onChange={(e) => setStackSize(parseInt(e.target.value))} />
            </div>
          </div>

          {throughput != undefined && (
            <div className="mt-4">
              <p className="ml-3">Input - {throughput.maxInput.toFixed(2)} items/s</p>
              <details title="Output" >
                <summary>Output - {throughput.results.reduce((acc, result) => acc + result.averageOutput, 0).toFixed(2)} items/s</summary>
                <div className="text-left mt-3 ml-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Average Output</TableHead>
                        <TableHead>Count</TableHead>
                        <TableHead>Chance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {throughput.results.map((result, i) => (
                        <TableRow>
                          <TableCell>{result.item}</TableCell>
                          <TableCell>{result.averageOutput.toFixed(2)} items/s</TableCell>
                          <TableCell>{crushingWheelRecipe?.results[i].count?.toFixed(0) ?? 1}</TableCell>
                          <TableCell>{crushingWheelRecipe?.results[i].chance?.toFixed(2) ?? (1).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>{throughput.results.reduce((acc, result) => acc + result.averageOutput, 0).toFixed(2)} items/s</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </details>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  )
}

export default App
