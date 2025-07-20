 module 0x1::AjoGroup {

    use std::signer;
    use std::vector;
    use std::string;
    use std::error;
    use std::coin;

    struct Ajo<Currency> has key {
        owner: address,
        members: vector<address>,
        contributions: vector<u64>,
        total_contributed: u64,
        contribution_amount: u64,
        current_round: u8,
    }

    public fun initialize<Currency>(
        owner: &signer,
        contribution_amount: u64
    ): Ajo<Currency> {
        Ajo {
            owner: signer::address_of(owner),
            members: vector::empty(),
            contributions: vector::empty(),
            total_contributed: 0,
            contribution_amount,
            current_round: 0,
        }
    }

    public fun join_group<Currency>(group: &mut Ajo<Currency>, user: address) {
        // Prevent duplicate joins
        let members = &mut group.members;
        let i = vector::index_of(members, &user);
        if (option::is_some(&i)) {
            abort 1; // Already joined
        };
        vector::push_back(members, user);
        vector::push_back(&mut group.contributions, 0);
    }

    public fun contribute<Currency>(
        group: &mut Ajo<Currency>,
        contributor: &signer,
        amount: u64,
        coin: coin::Coin<Currency>
    ) {
        assert!(amount == group.contribution_amount, error::invalid_argument(101));
        let sender = signer::address_of(contributor);
        let idx = vector::index_of(&group.members, &sender);
        if (option::is_none(&idx)) {
            abort 2; // Not a group member
        };
        let i = option::extract(idx);
        vector::borrow_mut(&mut group.contributions, i) += amount;
        group.total_contributed += amount;
        coin::destroy_zero(coin);
    }

    public fun payout<Currency>(
        group: &mut Ajo<Currency>,
        to: &signer,
        treasury: &mut coin::Treasury<Currency>
    ): coin::Coin<Currency> {
        // Only owner can trigger payout
        assert!(signer::address_of(to) == group.owner, error::permission_denied(102));
        let num_members = vector::length(&group.members);
        let round = group.current_round as usize;
        assert!(round < num_members, error::out_of_range(103));

        let receiver = *vector::borrow(&group.members, round);
        let amount = group.total_contributed;

        let payout_coin = coin::withdraw(treasury, amount);
        group.current_round += 1;
        group.total_contributed = 0;
        vector::fill(&mut group.contributions, 0);
        payout_coin
    }
}
