<Form.Check
  type="switch"
  id="buySellSwitch"
  name="sale"
  onChange={onSale}
  label={isBuy ? "Buy" : "Sell"}
  checked={isBuy}
  onChange={handleSwithChange}
/>;
