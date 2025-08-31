import { DepositEvent } from "@/modules/events/domain/types/deposit-event";
import { IEventHandler } from "../event.handler";
import { IAccountRepository } from "@/modules/accounts/application/repositories/account-repository";
import { HandlerResult } from "@/modules/events/domain/types/handle-result";
import { Account } from "@/modules/accounts/domain/entities/account.entity";

export class DepoistHandler implements IEventHandler<DepositEvent> {
  constructor(private accountRepository: IAccountRepository) {}

  async handle(event: DepositEvent): Promise<HandlerResult> {
    const { destination, amount } = event;

    let account = await this.accountRepository.findById(destination);

    if (!account) {
      account = Account.createWithInitalBalance(destination, 0);
      const result = account.deposit(amount);

      await this.accountRepository.save(result.affectedAccount);

      return {
        destination: {
          id: result.affectedAccount.id,
          balance: result.affectedAccount.balance,
        },
      };
    }

    const result = account.deposit(amount);
    await this.accountRepository.update(result.affectedAccount);

    return {
      destination: {
        id: result.affectedAccount.id,
        balance: result.affectedAccount.balance,
      },
    };
  }
}
