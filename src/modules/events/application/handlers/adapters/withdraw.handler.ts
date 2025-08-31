import { IAccountRepository } from "@/modules/accounts/application/repositories/account-repository";
import { IEventHandler } from "../event.handler";
import { WithdrawEvent } from "@/modules/events/domain/types/withdraw-event";
import { HandlerResult } from "@/modules/events/domain/types/handle-result";
import { AccountNotFoundError } from "@/modules/accounts/domain/errors/account-not-found.error";

export class WithdrawHandler implements IEventHandler<WithdrawEvent> {
  constructor(private accountRepository: IAccountRepository) {}

  async handle(event: WithdrawEvent): Promise<HandlerResult> {
    const { origin, amount } = event;

    const account = await this.accountRepository.findById(origin);

    if (!account) {
      throw new AccountNotFoundError(origin);
    }

    const result = account.withdraw(amount);
    await this.accountRepository.update(result.affectedAccount);

    return {
      origin: {
        id: result.affectedAccount.id,
        balance: result.affectedAccount.balance,
      },
    };
  }
}
