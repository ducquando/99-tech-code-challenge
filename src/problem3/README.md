# Messy React: Answers

## 1. Inefficiencies

### a. Redux hook

The `sortedBalances()` is currently recalled when there is a change on `balances` and `prices` variables. However, when we investigated the code block, we saw no contribution of the `prices` variable to the re-rendered value for `sortedBalances()`. Nonetheless, prices determines the `usdValue` in the `rows()` function, so we decided to relocate  `prices` from the `sortedBalances()`'s memo props to that of `row()`.

### b. Switch cases

We noticed that in `getPriority()` method, `Zilliqa` and `Neo` has the same priority value. Therefore, it is best to merge two cases together. Another thing that we have considered for this method is the declaration of type `RecognizedBlockchain`. We noticed that prop `blockchain` is currently having `any` type, yet it should be either 'Osmosis', 'Ethereum', 'Arbitrum', 'Zilliqa', or 'Neo'. Therefore, we added a new type and set the `blockchain` to have either that type of `any` type.

### c. If-else statements

Also, the business logic for the `sortedBalances()` is short but the implementation is quite long and hard to read. For example, we have a nested `if` to check whether the `balancePriority` is larger than `-99` and the `balance.amount` is `true`. We can combine this 3 lines into 1 line with `&` operator, which will use short-curcuiting to minimize the running time. Additionally, the sorted algorithm can also rewritten for more clarity. Instead of having two cases with no base case for `leftPriority == rightPriority`, we can utilize the `-1` return value. Knowing that the return of `-1` will place the `lhs` to the right of the `rhs`, we rewrite it as follows: `getPriority(lhs.currency) > getPriority(rhs.currency) ? -1 : 1`.

### d. Wrong names

We also observed the use of an attribute called `blockchain`, yet there is no declaration for this attribute in the `WalletBalance` interface. Yet, we believed this is a typo because we have another attribute called `currency` that has the same usage. Therefore, we decided to replace all instances of `blockchain` with `currency`.

## 2. Anti-patterns

### a. Single-responsibility and Interface segregation violations:

The `sortedBalances()` function is currently a doing three things: (i) filter the balance based on their currency + amount, (ii) sort this balance based on their priority value, (iii) return the filtered + sorted balances. However, it is better to have multiple single-responsibility methods than 1 multi-purpose method. Therefore, we will break this function into 3 functions: `filterBalances()`, `sortBalances()`, and `sortedBalances()`.

### b. Abstraction violations:

We are currently having 2 abstract class for wallet balance: `WalletBalance` and `FormattedWalletBalance`. Since the latter is a subclass of the former, we should create `FormattedWalletBalance` by inheriting `WalletBalance`. By doing this, when there is a need to add or modify attributes of `WalletBalance`, we will not have to modify both interfaces. However, after further analysis, we realized that the attribute `formatted` is just a formatted string of the `amount` value. Since we can easily obtain `formatted` with the `amount.toFix()` function, the inclusion of this attribute in `FormattedWalletBalance` interface is redundant. Therefore, we will remove the `FormattedWalletBalance` interface.

### c. Inheritance violations:

While the `Props` interface inherits from `BoxProps`, `Props` does not have any additional attributes or functions. Therefore, it is redundant to have this interface. One way to fix this anti-pattern is to remove `Props` and replace all instances of `Props` with `BoxProps`.

## 3. Refactored version

With all notified inefficiencies and anti-patterns, below are the the refactored version of the codeblock:

```javascript
interface WalletBalance {
    currency: string;
    amount: number;
}

type RecognizedBlockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: RecognizedBlockChain | any): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const filterBalances = (balances: WalletBalance[]) => {
        return balances.filter((balance: WalletBalance) => {
            return (getPriority(balance.currency) > -99) && (balance.amount <= 0);
        });
    }

    const sortBalances = (balances: WalletBalance[]) => {
        return balances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
            return getPriority(lhs.currency) > getPriority(rhs.currency) ? -1 : 1;
        });
    }

    const sortedBalances = useMemo(() => {
        const filteredBalances = filterBalances(balances);
        return sortBalances(filteredBalances);
    }, [balances]);

    const rows = useMemo(() => {
        return sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow 
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.amount.toFixed()}
                />
            )
        })
    }, [prices]);

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}
```

----

# Appendix: Original Codeblock

```javascript
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```